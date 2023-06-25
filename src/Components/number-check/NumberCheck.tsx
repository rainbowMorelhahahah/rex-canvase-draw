import { memo } from "react";
import { Button } from 'antd';

type NumberCheckOptions = {
    label: string;
    value: number;
};

interface NumberCheckPorps {
    value?: any;
    onChange?: (value: number) => void;
    options: NumberCheckOptions[]
}

function NumberCheckImpl(props: NumberCheckPorps) {

    const { value, onChange, options } = props;
    console.log(value, onChange)
    return (
        <div className="flex gap-2">
            {
                options.map((opion) => {
                    return (
                        <Button key={opion.value} onClick={() => { onChange?.(opion.value) }} type={opion.value === value ? "primary" : "default"}>{opion.label}</Button>
                    )
                })
            }
        </div>
    );
}


const NumberCheck = memo(NumberCheckImpl);

export {
    NumberCheck
}