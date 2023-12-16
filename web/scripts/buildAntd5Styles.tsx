import fs from 'fs'
import path from 'path'
import * as url from 'url';
import { extractStyle } from '@ant-design/static-style-extract'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const outputPath = path.resolve(__dirname, process.argv[2] ?? '../public/antd.min.css')

const css = extractStyle()

fs.writeFileSync(outputPath, css)
