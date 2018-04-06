import * as updateNotifier from "update-notifier";

export class UpdateNotifier {
  private notifier: any;

  constructor(pkg: any) {
    this.notifier = updateNotifier({ pkg });
    this.notifier.notify();
  }
}
