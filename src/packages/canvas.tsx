
import React, { memo, useEffect, useImperativeHandle, useRef } from 'react';
import styled from 'styled-components';
import { CanavasControl } from './control';

const CanvasBox = styled.div`
    width: 100%;
    height: 100%; 
`

const RexDrawEdit = React.forwardRef((props, ref) => {
    const divRef = useRef<HTMLDivElement>(null);
    const control = useRef<CanavasControl>();

    useImperativeHandle(ref, () => {
        return {
            control: control.current
        }
    }, [])

    useEffect(() => {
        control.current = new CanavasControl(divRef.current!);
    }, [])

    return (
        <CanvasBox ref={divRef} />
    );
})


export default memo(RexDrawEdit);