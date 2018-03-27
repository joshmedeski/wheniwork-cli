import chalk from "chalk";

declare global {
  interface Array<T> {
    chalkGray(): Array<T>;
    chalkResetBold(): Array<T>;
  }
}

if (!Array.prototype.chalkGray) {
  Array.prototype.chalkGray = function(): string[] {
    return this.map(i => chalk.gray(i));
  };
}

if (!Array.prototype.chalkResetBold) {
  Array.prototype.chalkResetBold = function(): string[] {
    return this.map(i => chalk.reset.bold(i));
  };
}
