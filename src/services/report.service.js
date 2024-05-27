const express = require("express");
const reportModel = require("../model/report.model");
const { ConflictRequestError, NotFoundError } = require("../core/response/error.response");


class reportService{

    newReport = async(data)=>{
            const create =  await reportModel.create(data);
            if(create.length===0)
                throw new ConflictRequestError("Content is empty")
            return create;
        } ;
    viewReport = async (id)=>{
        const view = await reportModel.findById(id);
        if(!view)
            throw new NotFoundError();
        return view;
    }
    viewAllReport = async()=>{
        const view = await postTagModel.find()
        if(!view)
            throw new NotFoundError();
        return view
    };
    updateReport = async(id,content)=>{
        if(await this.viewReport(id).length === 0)
             throw new NotFoundError("Cannot Find ID");
        if(content.length === 0)
            throw new ConflictRequestError("Content is empty")
        return await reportModel.findByIdAndUpdate(id, content)
    };
    deleteReport = async(id)=>{
        if(await this.viewReport(id).length === 0)
            throw new NotFoundError("Cannot Find ID");
        return await reportModel.findByIdAndDelete(id)
    }

    }
module.exports = new reportService();