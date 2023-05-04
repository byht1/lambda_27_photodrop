export type TCtrlWrapperFunc<D, B, P, Q> = (req: Req<P, B, Q>, res: Res<D>, next: Next) => void;
