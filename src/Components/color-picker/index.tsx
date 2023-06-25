import { memo } from 'react';
import './index.less';
import ColorPicker, { Color, HsbaColorType } from '@rc-component/color-picker';


interface ColorPocker {
    color: Color,
    onChange: (color: Color, type?: HsbaColorType) => void,
}

function RexColorPickerImpl(props: ColorPocker) {
    const { color, onChange } = props;
    return <ColorPicker color={color} onChange={onChange} />
}

export const RexColorPicker = memo(RexColorPickerImpl)
