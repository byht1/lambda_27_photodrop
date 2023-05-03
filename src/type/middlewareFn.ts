export type TMiddlewareFn = (req: Req, res: Res<any>, next: Next) => Promise<void>;
