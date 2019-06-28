export class Prompt {
    Question?: string;

    // Options
    private _options: PromptOption[] = [];
    public get Options(): PromptOption[] {
        return this._options;
    }
    public set Options(value: PromptOption[]) {
        this._options = value.map(x => new PromptOption(x));
    }

    constructor(init?: any) {
        Object.assign(this, init)
    }
}

export class PromptOption {
    Label?: string;
    Value?: string;

    constructor(init?: any) {
        Object.assign(this, init)
    }
}