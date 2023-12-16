import * as Koa from 'koa';
import * as zlib from 'zlib';

declare namespace koaCompress {
  export declare function Compress(
    options?: koaCompress.CompressOptions
  ): Koa.Middleware<StateT, ContextT>;

  export interface Options {
    /**
     * An optional function that checks the response content type to decide whether to compress. By default, it uses compressible.
     */
    filter?: ((mimeType: string) => boolean) | undefined;

    /**
     * Minimum response size in bytes to compress. Default 1024 bytes or 1kb.
     */
    threshold?: number | string | undefined;

    /**
     * An optional string, which specifies what encoders to use for requests
     * without Accept-Encoding. Default: 'idenity'.
     */
    defaultEncoding?: string | undefined;

    /**
     * Options for brotli compression.
     */
    br?: zlib.BrotliOptions | false | undefined;

    /**
     * Options for gzip compression.
     */
    gzip?: zlib.ZlibOptions | false | undefined;

    /**
     * Options for deflate compression.
     */
    deflate?: zlib.ZlibOptions | false | undefined;
  }
}
