import { readFileSync } from 'fs';
import ts from 'typescript';

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ClassDeclaration:
        {
          const classDeclaration = node as ts.ClassDeclaration;
          if (classDeclaration.modifiers) {
            const modifier = classDeclaration.modifiers.find(node => {
              return node.kind === ts.SyntaxKind.Decorator;
            });
            if (modifier) {
              const decorator = modifier as ts.Decorator;
              report(decorator, `Class Decorator ${decorator.getText()}`);
            }
          }
        }
        break;
    }

    ts.forEachChild(node, delintNode);
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart()
    );
    console.log(
      `${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`
    );
  }
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
  // Parse a file
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ESNext,
    /*setParentNodes */ true
  );

  // delint it
  delint(sourceFile);
});
