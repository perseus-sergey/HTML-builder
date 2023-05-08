// node 06-build-page

class BuildDist {
  fs = require('fs');
  path = require('path');

  distDir = 'project-dist';
  assetsDir = 'assets';
  pathToDistDir = this.path.join(__dirname, this.distDir);
  pathToScrAssetsDir = this.path.join(__dirname, this.assetsDir);
  pathToComponentsDir = this.path.join(__dirname, 'components');
  templateHtmlFilePath = this.path.join(__dirname, 'template.html');
  distHtmlFile = this.path.join(this.pathToDistDir, 'index.html');
  pathToStylesDir = this.path.join(__dirname, 'styles');
  cssBundleFilePath = this.path.join(this.pathToDistDir, 'style.css');
  bundleExtention = this.path.extname(this.cssBundleFilePath);
  htmlComponentsExtention = '.html';

  constructor() {
    this.start();
  }

  async start() {
    await this.makeDist();
    this.makeHtml();
    this.copyAssetsDir(this.pathToScrAssetsDir);
    this.makeCssBundle(this.pathToStylesDir);
  }

  async makeDist() {
    try {
      await this.fs.promises.rm(this.pathToDistDir, { recursive: true, force: true });
      await this.fs.promises.mkdir(this.pathToDistDir, { recursive: true });
      this.fs.writeFile(this.cssBundleFilePath, '', err => {if(err) throw err;});
      this.fs.writeFile(this.distHtmlFile, '', err => {if(err) throw err;});
    } catch (err) {
      console.error(err);
    }
  }

  async makeHtml() {
    try {
      await this.fs.promises.writeFile(this.cssBundleFilePath, '');
      let tempHtml = await this.fs.promises.readFile(
        this.templateHtmlFilePath,
        'utf-8'
      );

      const objects = await this.fs.promises.readdir(this.pathToComponentsDir, {
        withFileTypes: true,
      });

      for (const obj of objects) {
        const srcObjPath = this.path.join(this.pathToComponentsDir, obj.name);
        if (this.path.extname(srcObjPath) === this.htmlComponentsExtention) {
          const data = await this.fs.promises.readFile(srcObjPath, 'utf-8');

          const componName = obj.name.split('.html')[0];

          // console.log('Temp Html : ', tempHtml);
          const regex = new RegExp(`{{\\s?${componName}\\s?}}`, 'gi');
          tempHtml = tempHtml.replace(regex, data);
        }
      }
      // console.log('Temp Html END : ', tempHtml);
      this.fs.writeFile(this.distHtmlFile, tempHtml, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      console.error(err);
    }
  }

  async makeCssBundle(srcDirPath) {
    try {
      const objects = await this.fs.promises.readdir(srcDirPath, {
        withFileTypes: true,
      });

      objects.forEach((obj) => {
        const srcObjPath = this.path.join(srcDirPath, obj.name);
        if (obj.isDirectory()) {
          this.makeCssBundle(srcObjPath);
        } else {
          if (this.path.extname(srcObjPath) === this.bundleExtention) {
            this.fs.readFile(srcObjPath, 'utf-8', (err, data) => {
              if (err) throw err;
              this.fs.appendFile(this.cssBundleFilePath, `${data}\n`, (err) => {
                if (err) throw err;
                // console.log('Append CSS : ', obj.name);
              });
            });
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  async copyAssetsDir(srcDirPath) {
    try {
      let splitedPath = srcDirPath.split(this.assetsDir);
      const distDirPath = this.path.join(
        splitedPath[0],
        this.distDir,
        this.assetsDir,
        splitedPath[1]
      );

      await this.fs.promises.mkdir(distDirPath, { recursive: true });

      const objects = await this.fs.promises.readdir(srcDirPath, {
        withFileTypes: true,
      });

      objects.forEach((obj) => {
        const srcObjPath = this.path.join(srcDirPath, obj.name);
        if (obj.isDirectory()) {
          this.copyAssetsDir(srcObjPath);
        } else {
          this.fs.copyFile(
            srcObjPath,
            this.path.join(distDirPath, obj.name),
            (err) => {
              if (err) throw err;
            }
          );
        }
      });
      // }
    } catch (err) {
      console.error(err);
    }
  }
}
const buildDist = new BuildDist();