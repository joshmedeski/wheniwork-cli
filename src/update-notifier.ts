import * as updateNotifier from "update-notifier";
import * as program from "commander";

// const updateNotifier = require('update-notifier');
// const pkg = require('./package.json');

// updateNotifier({pkg}).notify();

export class UpdateNotifier {
  private notifier: any;

  constructor(pkg: any) {
    // this.notifier = updateNotifier({ pkg });
    this.notifier = updateNotifier({
      pkg,
      updateCheckInterval: 100 // now (pretty much)
    });

    if (this.notifier.update) {
      console.log(`Update available: ${this.notifier.update.latest}`);
    }

    this.notifier.notify();
  }
}
