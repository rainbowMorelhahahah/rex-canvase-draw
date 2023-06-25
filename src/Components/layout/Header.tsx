import React, { memo, useCallback, useMemo, useState } from "react";
import { RgbColorPicker, RgbColor } from 'react-colorful';
import { Form, Popover, Slider, Tooltip } from 'antd';
import { useDrawStore } from "../../stores";
import { DrawMode } from "../../packages/types";

type LayoutProps = {
} & React.HTMLAttributes<HTMLDivElement>;

function HeaderToolIcon(props: {
    selected?: boolean,
    help: string,
    content?: React.ReactNode,
    children?: React.ReactElement,
    onClick?: () => void
}) {

    const { children, onClick, selected, help, content } = props;

    const render = useMemo(() => {

        return (
            <Popover
                content={
                    <>
                        {!selected && help}
                        {selected && content || help}
                    </>
                }
            >
                <button
                    className="p-2"
                    onClick={onClick}
                >
                    {children}
                </button>
            </Popover>
        )



    }, [selected])

    return render;
}

function HeaderImpl(props: LayoutProps) {

    const { drawMode, setDrawMode } = useDrawStore();

    const [color, setColor] = useState<RgbColor>({
        r: 0,
        g: 0,
        b: 0
    });

    const isSelectedMode = (targetMode: DrawMode) => {
        return targetMode === drawMode;
    }

    const shouldLightIcon = (targetMode: DrawMode) => {
        return isSelectedMode(targetMode) ? "rgb(66, 70, 226)" : 'rgb(15,15,15)'
    }

    const options = [
        {
            help: '画笔',
            value: DrawMode.BRUSH_MODE,
            onClick: () => {
                setDrawMode(DrawMode.BRUSH_MODE)
            },
            icon: (
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="16564" width="20" height="20">
                    <path fill={shouldLightIcon(DrawMode.BRUSH_MODE)} d="M314.88 626.133333l96.213333 94.933334a130.346667 130.346667 0 0 1-108.16 54.826666 104.32 104.32 0 0 1-73.386666-27.52 102.4 102.4 0 0 0 42.666666-26.88 110.933333 110.933333 0 0 0 25.386667-64v-2.346666a59.52 59.52 0 0 1 7.893333-26.88 31.146667 31.146667 0 0 1 10.026667-2.56m14.08-64c-64 0-85.333333 27.733333-95.146667 85.333333v2.773333c-2.986667 18.773333-5.12 25.386667-8.533333 29.013334a39.68 39.68 0 0 1-8.746667 7.04 33.493333 33.493333 0 0 1-18.133333 5.12 29.866667 29.866667 0 0 1-8.746667-1.066667h-1.92a29.013333 29.013333 0 0 0-10.24-1.92A27.946667 27.946667 0 0 0 149.333333 717.013333c8.96 81.28 78.72 122.88 153.386667 122.88A189.226667 189.226667 0 0 0 481.28 725.333333a27.946667 27.946667 0 0 0-6.4-30.293333l-126.293333-125.653333a28.16 28.16 0 0 0-19.626667-8.106667l0.64 0.426667zM808.32 234.666667H810.666667c0 10.453333-9.386667 49.066667-97.493334 158.72-15.36 18.986667-31.146667 37.76-47.146666 56.106666-31.146667 35.84-147.626667 157.44-147.626667 157.44l-80.853333-81.493333s117.12-114.346667 154.24-147.413333c19.84-17.493333 40.32-34.56 60.586666-50.986667 100.053333-80.426667 140.8-92.373333 155.946667-92.373333m0-64c-47.146667 0-111.786667 38.826667-196.053333 106.666666-21.333333 17.066667-42.666667 34.773333-62.72 52.906667-38.677333 34.133333-76.373333 69.269333-113.066667 105.386667-14.72 14.72-29.653333 29.653333-44.16 44.586666l-3.413333 3.626667a60.8 60.8 0 0 0 0 85.333333l85.333333 86.4c11.306667 11.306667 26.666667 17.706667 42.666667 17.706667a60.586667 60.586667 0 0 0 42.666666-17.706667l3.2-3.2 9.813334-9.813333 34.773333-35.413333c35.84-37.12 71.893333-76.16 105.386667-114.773334 16.64-18.986667 32.853333-38.4 48.64-58.026666 102.186667-126.08 142.72-208 89.173333-249.813334a66.56 66.56 0 0 0-42.666667-13.866666h0.426667z" p-id="16565"></path>
                </svg>
            ),
            content: (
                <>
                    <div className="w-44">
                        <h4>Brush settings</h4>
                        <Form layout="vertical">
                            <Form.Item label="Size">
                                <Slider />
                            </Form.Item>
                            <Form.Item label="Opacity">
                                <Slider />
                            </Form.Item>
                        </Form>
                    </div>
                </>
            )
        },
        {
            help: "橡皮擦",
            value: DrawMode.ERASER_MODE,
            onClick: () => {
                setDrawMode(DrawMode.ERASER_MODE)
            },
            icon: (
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17335" width="20" height="20">
                    <path fill={shouldLightIcon(DrawMode.ERASER_MODE)} d="M891.46 893.42H132.54c-18.3 0-33.18 14.88-33.18 33.18s14.88 33.18 33.18 33.18h758.93c18.3 0 33.18-14.88 33.18-33.18 0-18.29-14.89-33.18-33.19-33.18zM193.02 734.36c39.62 39.64 92.39 61.46 148.6 61.46S450.6 774 490.22 734.36L769.5 455.08c39.63-39.62 61.46-92.39 61.46-148.59 0-56.21-21.83-108.99-61.46-148.61l-32.12-32.11c-39.7-39.7-92.48-61.56-148.6-61.56-56.13 0-108.92 21.86-148.61 61.56L160.91 405.04c-81.94 81.94-81.94 215.27 0 297.21l32.11 32.11z m307.3-103.94L264.85 394.96 487.1 172.71c27.16-27.15 63.28-42.12 101.68-42.12 38.4 0 74.51 14.97 101.67 42.12l32.12 32.11c56.05 56.06 56.05 147.29 0 203.34L500.32 630.42zM217.93 441.88L453.4 677.34l-10.1 10.1c-56.06 56.04-147.29 56.04-203.34 0l-32.12-32.11c-56.06-56.06-56.06-147.31 0-203.36l10.09-10.09z" p-id="17336"></path>
                </svg>
            ),
            content: (
                <>
                    <div className="w-44">
                        <h4>Eraser settings</h4>
                        <Form layout="vertical">
                            <Form.Item label="Size">
                                <Slider />
                            </Form.Item>
                            <Form.Item label="Opacity">
                                <Slider />
                            </Form.Item>
                        </Form>
                    </div>
                </>
            )
        },
        {
            help: "选择工具",
            value: DrawMode.SELECT_MODE,
            onClick: () => {
                setDrawMode(DrawMode.SELECT_MODE)
            },
            icon: (
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20018" width="20" height="20">
                    <path fill={shouldLightIcon(DrawMode.SELECT_MODE)} d="M245.1 184.5l362.8 362.8 100.3 100.3H436.9l-14.6 14.6-177.2 177.3v-655m-50-120.7v896.3l262.5-262.5h371.3L643.3 512 195.1 63.8z" p-id="20019"></path>
                </svg>
            )
        }
    ]

    return (
        <div className="flex flex-row items-center h-[46px] border-solid border-b-[1px] border-[#e8e8e8] p-4">
            <div className="tool-box flex items-center">

                <Popover
                    arrow={false}
                    trigger={['click']}
                    content={
                        <RgbColorPicker
                            color={color}
                            onChange={(v) => {
                                setColor(v)
                            }} />
                    }
                >
                    <div
                        className="w-5 h-5 border cursor-pointer border-solid border-[#e8e8e8]"
                        style={{
                            backgroundColor: `rgb(${color.r},${color.g},${color.b})`,
                        }}
                    ></div>
                </Popover>

                {
                    options.map((o) => {
                        return (
                            <HeaderToolIcon
                                help={o.help}
                                content={o.content}
                                selected={isSelectedMode(o.value)}
                                onClick={o.onClick}>
                                {o.icon}
                            </HeaderToolIcon>
                        )
                    })
                }
                <HeaderToolIcon
                    help="上传图片"
                >
                    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="35805" width="20" height="20">
                        <path fill="#333333" d="M716.78 609.59L604.8 525.61c-16.97-12.72-40.62-12.72-57.59 0l-98.58 73.92L317.2 494.39c-16.48-13.19-39.28-14.19-56.81-2.39L128 581.02V224h704v352c0 17.67 14.33 32 32 32s32-14.33 32-32V221.31c0-33.81-27.5-61.31-61.31-61.31H125.31C91.5 160 64 187.5 64 221.31v581.38C64 836.5 91.5 864 125.31 864H608c17.67 0 32-14.33 32-32s-14.33-32-32-32H128V658.16l158.36-106.48 161.02 128.8L576 584l102.38 76.78c14.19 10.67 34.23 7.73 44.8-6.39 10.6-14.14 7.74-34.2-6.4-44.8z" p-id="35806"></path><path d="M576 384c0 52.94 43.06 96 96 96s96-43.06 96-96-43.06-96-96-96-96 43.06-96 96z m128 0c0 17.64-14.36 32-32 32s-32-14.36-32-32 14.36-32 32-32 32 14.36 32 32zM928 768h-64v-64c0-17.67-14.33-32-32-32s-32 14.33-32 32v64h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64v64c0 17.67 14.33 32 32 32s32-14.33 32-32v-64h64c17.67 0 32-14.33 32-32s-14.33-32-32-32z" p-id="35807"></path>
                    </svg>
                </HeaderToolIcon>
            </div>
        </div>
    );
}

export const Header = memo(HeaderImpl);