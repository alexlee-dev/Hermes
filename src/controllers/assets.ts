import express, { Router, Request, Response } from "express";
import path from "path";

class AssetsController {
  public router: Router = express.Router();

  static assetList: string[] = [
    "font-awesome/css/all.min.css",
    "font-awesome/webfonts/fa-regular-400.woff2",
    "galaxy_starfield.png",
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    AssetsController.assetList.forEach((asset: string) => {
      this.router.get(
        `/assets/${asset}`,
        async (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, `../assets/${asset}`));
        }
      );
    });
  }
}

export default AssetsController;
