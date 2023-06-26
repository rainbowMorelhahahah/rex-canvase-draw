import { memo, useMemo } from "react";
import { AsideUtil } from "./AsideUtil";
import { AiPrompt } from './AiPrompt';
import { useDrawStore } from "../../../stores";
import { AsideTabContent } from "../../../packages/types";
import { LayerManage } from "./LayerManage";

type AsideImpl = {};

function AsideImpl(props: AsideImpl) {
    const { asideType } = useDrawStore();

    const renderAsideContent = useMemo(() => {
        if (asideType === AsideTabContent.AI_PROMPT) {
            return <AiPrompt />
        }

        if (asideType === AsideTabContent.LAYER) {
            return <LayerManage />
        }

    }, [asideType])

    return (
        <aside className='w-[367px] flex'>
            <div className='flex-auto flex flex-col justify-between'>
                {renderAsideContent}
            </div>
            <AsideUtil />
        </aside>
    );
}

const Aside = memo(AsideImpl);

export {
    Aside
}