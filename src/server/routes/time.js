import express from "express";

const express = require('express');
const router = express.Router();

router.get('/', function(_, res) {
  const serverTimeSeconds = new Date().getTime() / 1000;
  res.send({
    epoch: serverTimeSeconds
  });
});

export default router