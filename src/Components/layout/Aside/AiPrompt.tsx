import { Form, Input, Select, Slider } from 'antd';
import { memo } from 'react';
import { NumberCheck } from '../../number-check';

function AiPromptImpl() {
    return (
        <>

            <section className='flex-auto  p-[16px]'>
                <header className='flex justify-between'>
                    <h2>
                        <small>Icon</small>
                        Create
                    </h2>
                    <i>
                        Close
                    </i>
                </header>

                <p className='text-sm mt-4'>AI-driven visualization tool for quick product variations, sketches, and renderings.</p>

                <Form layout='vertical' className='mt-4'>
                    <Form.Item label="Prompt" name="prompt">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Mode" name="mode">
                        <Select>
                            <Select.Option value="1">Render</Select.Option>
                            <Select.Option value="2">Refine/Iterate</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Drawing influence" name="slider">
                        <Slider />
                    </Form.Item>

                    <Form.Item label="Number of images" name="images">
                        <NumberCheck options={[
                            {
                                label: "1",
                                value: 1
                            },
                            {
                                label: "4",
                                value: 2
                            }
                        ]} />
                    </Form.Item>

                </Form>

            </section>
            <footer className='p-[16px]'>
                <button className='h-[45px] bg-blue-300 rounded-lg w-full'>Create</button>
            </footer>
        </>
    );
}

const AiPrompt = memo(AiPromptImpl);

export {
    AiPrompt
}