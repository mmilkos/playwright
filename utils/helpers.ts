import {test, TestStepInfo} from "@playwright/test";

export const step = async (title: string, body: (step: TestStepInfo) => any ) => {
    await test.step(title, body);
}