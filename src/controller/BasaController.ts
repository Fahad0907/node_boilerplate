import express from "express";

export abstract class BaseController {
    public ok<T>(res : express.Response, dto? : T) {
        if(!!dto){
            return res.status(200).json(dto);
        }else{
            return res.status(200);
        }
    }
    public create<T>(res: express.Response, dto? : T){
        if(!!dto){
            return res.status(201).json(dto);
        }else{
            return res.status(201);
        }
    }
    public error<T>(res: express.Response, dto? : T){
        if(!!dto){
            return res.status(400).json(dto);
        }else{
            return res.status(400);
        }
    }
    public unAuthorize<T>(res : express.Response, dto? : T){
        if(!!dto){
            return res.status(401).json(dto);
        }else{
            return res.status(401);
        }
    }
}