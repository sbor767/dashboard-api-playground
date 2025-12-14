import { Router, Request, Response } from "express";

export interface ControllerRoute {
	path: string;
	func: (req: Request, res: Response) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'patch' | 'delete'>;
}
