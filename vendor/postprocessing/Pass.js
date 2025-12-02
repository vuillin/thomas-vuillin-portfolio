class Pass {
  constructor() {
    this.enabled = true;
    this.needsSwap = true;
    this.clear = false;
    this.renderToScreen = false;
  }

  setSize() {}

  setPixelRatio() {}

  render() {
    console.error('Pass: .render() must be implemented in derived pass.');
  }

  dispose() {}
}

export { Pass };
