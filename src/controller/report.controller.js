const express = require("express");
const postTagController = require("./postTagController");
const reportService = require("../services/report.service");
const { OK } = require("../core/response/success.response");



class reportController {
    newReport = async(req, res, next)=> {
        const result = new OK({
            message: "Create Post Success",
            metadata: await reportService.newReport(req.body)
        })
        result.send(res);
    };
    getAllReport = async(req, res, next)=>{
        const result = new OK({
            message:" View posts Success",
            metadata: await reportService.viewAllReport()
        })
        result.send(res);
    };
    getAReport = async(req, res, next)=>{
        const result = new OK({
            message:" View a report Success",
            metadata: await reportService.viewReport(req.params.id)
        })
        result.send(res);
    };
    updateReport = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Success",
            metadata: await reportService.updateReport(req.params,req.body)
        })
        result.send(res);
    };
    deleteReport = async(req, res, next)=>{
        const result = new OK({
            message:" Update a post Sucess",
            metadata: await reportService.deleteReport(req.params)
        })
        result.send(res);
    };

}
module.exports = new reportController();