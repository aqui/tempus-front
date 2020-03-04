import { Code } from './Code';

export class CodeTable {
    id: number;
    codeTableCode: string;
    codeTableDescription: string;
    systemParameter: boolean;
    codes: Code[];
}
