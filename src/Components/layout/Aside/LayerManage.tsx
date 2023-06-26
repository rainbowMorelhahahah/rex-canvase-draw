import { Tooltip } from 'antd';
import { memo } from 'react';
import { LayerItem } from '.';
import { useLayerStore } from '../../../stores';

function LayerManageImpl() {

    const { layres, addLayer, handleSelectLayer } = useLayerStore();

    return (
        <article className='p-4'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center'>
                    <i className='flex rounded-sm w-8 h-8 justify-center items-center bg-blue-400 mr-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="white"><path d="M8.38789 12.6258L15.6672 15.928C15.8797 16.0245 16.12 16.0245 16.3325 15.928L23.6118 12.6258C24.129 12.3911 24.129 11.6096 23.6118 11.3749L16.3328 8.07242C16.2284 8.0247 16.115 8 16.0002 8C15.8854 8 15.7719 8.0247 15.6675 8.07242L8.38789 11.3746C7.8707 11.6093 7.8707 12.3911 8.38789 12.6258ZM23.6121 15.3845L21.7968 14.5617L16.7456 16.8514C16.5094 16.9586 16.2584 17.013 16 17.013C15.7416 17.013 15.4909 16.9586 15.2544 16.8514L10.2035 14.5617L8.38789 15.3845C7.8707 15.6189 7.8707 16.4001 8.38789 16.6345L15.6672 19.9342C15.8797 20.0304 16.12 20.0304 16.3325 19.9342L23.6121 16.6345C24.1293 16.4001 24.1293 15.6189 23.6121 15.3845ZM23.6121 19.3782L21.8037 18.5586L16.7456 20.8513C16.5094 20.9585 16.2584 21.0129 16 21.0129C15.7416 21.0129 15.4909 20.9585 15.2544 20.8513L10.1966 18.5586L8.38789 19.3782C7.8707 19.6126 7.8707 20.3939 8.38789 20.6282L15.6672 23.9279C15.8797 24.0241 16.12 24.0241 16.3325 23.9279L23.6121 20.6282C24.1293 20.3939 24.1293 19.6126 23.6121 19.3782Z"></path></svg>
                    </i>
                    Layers
                </div>
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#333" width="24" height="24" fill="#333"><path d="M6 6L18 18" fill="none" strokeWidth="1.04762" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18 6L6 18" fill="none" strokeWidth="1.04762" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
            </div>
            <div className='flex justify-end gap-2'>
                <div className='flex h-full relative'>
                    <Tooltip title='导入图片'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#333" width="24" height="24" fill="#333"><path d="M7 10L3 16.5V17.5C3 18.6046 3.89543 19.5 5 19.5H18C19.1046 19.5 20 18.6046 20 17.5V17L15.8007 13.3172C15.5987 13.1401 15.2929 13.1542 15.1081 13.3492L13.1166 15.4505C12.6358 15.9578 11.796 15.8279 11.491 15.1989L8 10C7.83131 9.65214 7.21445 9.67832 7 10Z" stroke="none"></path><path d="M3 16.5V7.5C3 6.39543 3.89543 5.5 5 5.5H14M3 16.5L7 10M3 16.5V17.5M20 17V11M20 17V17.5M20 17L15.8007 13.3172M18 11V11C15.7909 11 14 9.20914 14 7V7M18 11V11C20.2091 11 22 9.20914 22 7V7M18 11C20.2091 11 22 9.20914 22 7M18 11C15.7909 11 14 9.20914 14 7M16 7L17.5 5.5M16 7L17.5 8.5M16 7H20M7 10C7.21445 9.67832 7.83131 9.65214 8 10M7 10L7.14645 9.85355C7.34171 9.65829 7.65829 9.65829 7.85355 9.85355L8 10M3 17.5C3 18.6046 3.89543 19.5 5 19.5M3 17.5V17.5C3 18.6046 3.89543 19.5 5 19.5V19.5M5 19.5H18M18 19.5C19.1046 19.5 20 18.6046 20 17.5M18 19.5V19.5C19.1046 19.5 20 18.6046 20 17.5V17.5M15.8007 13.3172C15.5987 13.1401 15.2929 13.1542 15.1081 13.3492M15.8007 13.3172V13.3172C15.5987 13.1401 15.2929 13.1542 15.1081 13.3492V13.3492M15.1081 13.3492L13.1166 15.4505M13.1166 15.4505C12.6358 15.9578 11.796 15.8279 11.491 15.1989M13.1166 15.4505V15.4505C12.6358 15.9578 11.796 15.8279 11.491 15.1989V15.1989M11.491 15.1989L8 10M22 7C22 4.79086 20.2091 3 18 3M22 7V7C22 4.79086 20.2091 3 18 3V3M18 3C15.7909 3 14 4.79086 14 7M18 3V3C15.7909 3 14 4.79086 14 7V7" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                    </Tooltip>
                </div>
                <div className='flex h-full relative'>
                    <Tooltip title='新增图层'>
                        <button onClick={() => addLayer()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#333" width="24" height="24" fill="#333"><rect x="4.75" y="4.75" width="14.5" height="14.5" rx="7.25" fill="none" strokeWidth="1.5"></rect><path d="M12 9V15" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15 12H9" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        </button>
                    </Tooltip>
                </div>
            </div>

            <div className='mt-2'>

                {
                    layres.map((item) => {
                        return (
                            <LayerItem
                                key={item.uuid}
                                {...item}
                                onSelect={() => handleSelectLayer(item.uuid!)}
                            />
                        )
                    })
                }

            </div>

        </article>
    )
}

const LayerManage = memo(LayerManageImpl);

export {
    LayerManage
}
