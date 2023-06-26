import { memo } from "react";
import './layer-item.css';

function LayerItemMome() {
    return (
        <div className="flex flex-col">
            <div className="flex-auto grid gap-3 grid-cols-3 group">
                <div className="repeating overflow-hidden h-11 rounded">

                </div>
                <div className="min-w-0 flex justify-center gap-2 flex-col text-[12px]">
                    <div className="flex m-[-2px_0px_-1px] leading-[15px]">
                        Layer1
                    </div>
                    <div className="flex items-center gap-2 text-[rgb(152,152,152)] cursor-pointer">
                        <span className="text-[12px]">100%</span>
                        <span className="text-[12px]">Normal</span>
                        <button className="invisible group-hover:visible">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" fill="#333"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-5">
                    <button className="hidden group-hover:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 410" width="12" height="12" fill="#333"><path d="M308.599 303C308.599 306.094 306.091 308.602 302.998 308.602H112.598V409.402H409.398V112.602H308.598L308.599 303Z"></path><path d="M107 297.4H297.4V0.599609H0.599609V297.4H107Z"></path></svg>
                    </button>
                    <button className="hidden group-hover:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 600" width="14" height="12" fill="#333"><defs><symbol id="f" overflow="visible"><path d="m39.078-2.3281c-2.0117 1.043-4.1094 1.8281-6.2969 2.3594s-4.4648 0.79688-6.8281 0.79688c-7.0859 0-12.699-1.9766-16.844-5.9375-4.1367-3.957-6.2031-9.3281-6.2031-16.109 0-6.7891 2.0664-12.164 6.2031-16.125 4.1445-3.9688 9.7578-5.9531 16.844-5.9531 2.3633 0 4.6406 0.26562 6.8281 0.79688s4.2852 1.3242 6.2969 2.375v8.7969c-2.0312-1.3828-4.0391-2.3984-6.0156-3.0469-1.9688-0.64453-4.0469-0.96875-6.2344-0.96875-3.9062 0-6.9844 1.2578-9.2344 3.7656-2.2422 2.5-3.3594 5.9531-3.3594 10.359 0 4.3867 1.1172 7.8359 3.3594 10.344 2.25 2.5 5.3281 3.75 9.2344 3.75 2.1875 0 4.2656-0.32031 6.2344-0.96875 1.9766-0.64453 3.9844-1.6602 6.0156-3.0469z"></path></symbol><symbol id="e" overflow="visible"><path d="m16.031-40.953v9.0625h10.516v7.2812h-10.516v13.531c0 1.4805 0.28906 2.4805 0.875 3 0.59375 0.52344 1.7656 0.78125 3.5156 0.78125h5.2344v7.2969h-8.7344c-4.0312 0-6.8867-0.83594-8.5625-2.5156-1.6797-1.6875-2.5156-4.5391-2.5156-8.5625v-13.531h-5.0781v-7.2812h5.0781v-9.0625z"></path></symbol><symbol id="d" overflow="visible"><path d="m26.594-27.234v-17.078h10.266v44.312h-10.266v-4.6094c-1.3984 1.875-2.9453 3.25-4.6406 4.125-1.6875 0.875-3.6406 1.3125-5.8594 1.3125-3.9297 0-7.1562-1.5625-9.6875-4.6875-2.5234-3.125-3.7812-7.1445-3.7812-12.062 0-4.9141 1.2578-8.9375 3.7812-12.062 2.5312-3.125 5.7578-4.6875 9.6875-4.6875 2.1953 0 4.1445 0.44531 5.8438 1.3281 1.707 0.88672 3.2578 2.2578 4.6562 4.1094zm-6.7188 20.656c2.1875 0 3.8516-0.79688 5-2.3906 1.1445-1.5938 1.7188-3.9102 1.7188-6.9531 0-3.0391-0.57422-5.3594-1.7188-6.9531-1.1484-1.5938-2.8125-2.3906-5-2.3906-2.168 0-3.8242 0.79688-4.9688 2.3906-1.1484 1.5938-1.7188 3.9141-1.7188 6.9531 0 3.043 0.57031 5.3594 1.7188 6.9531 1.1445 1.5938 2.8008 2.3906 4.9688 2.3906z"></path></symbol><symbol id="c" overflow="visible"><path d="m21.875-6.5781c2.1758 0 3.8359-0.79688 4.9844-2.3906 1.1562-1.5938 1.7344-3.9102 1.7344-6.9531 0-3.0391-0.57812-5.3594-1.7344-6.9531-1.1484-1.5938-2.8086-2.3906-4.9844-2.3906-2.1875 0-3.8672 0.80469-5.0312 2.4062-1.168 1.6055-1.75 3.918-1.75 6.9375 0 3.0234 0.58203 5.3359 1.75 6.9375 1.1641 1.6055 2.8438 2.4062 5.0312 2.4062zm-6.7812-20.656c1.4062-1.8516 2.9609-3.2227 4.6719-4.1094 1.707-0.88281 3.6719-1.3281 5.8906-1.3281 3.9375 0 7.1641 1.5625 9.6875 4.6875 2.5195 3.125 3.7812 7.1484 3.7812 12.062 0 4.918-1.2617 8.9375-3.7812 12.062-2.5234 3.125-5.75 4.6875-9.6875 4.6875-2.2188 0-4.1836-0.44531-5.8906-1.3281-1.7109-0.88281-3.2656-2.2539-4.6719-4.1094v4.6094h-10.188v-44.312h10.188z"></path></symbol><symbol id="b" overflow="visible"><path d="m5.3594-42.516h10.953v42.516h-10.953z"></path></symbol><symbol id="a" overflow="visible"><path d="m5.3594-42.516h13.953l9.6875 22.75 9.7344-22.75h13.922v42.516h-10.359v-31.094l-9.7969 22.922h-6.9531l-9.7969-22.922v31.094h-10.391z"></path></symbol></defs><g><path d="m565.83 116.67h-75.832v-70c0-25.785-20.883-46.668-46.668-46.668h-186.67c-25.785 0-46.668 20.883-46.668 46.668v70h-75.832c-16.102 0-29.168 13.066-29.168 29.168 0 16.102 13.066 29.168 29.168 29.168h17.5v338.33c0 25.785 20.883 46.668 46.668 46.668h303.33c25.785 0 46.668-20.883 46.668-46.668v-338.33h17.5c16.102 0 29.168-13.066 29.168-29.168 0-16.102-13.066-29.168-29.168-29.168zm-134.16 0h-163.33v-32.668c0-14.234 11.434-25.668 25.668-25.668h112c14.234 0 25.668 11.434 25.668 25.668v32.668zm-163.34 81.664v280c0 12.832-10.5 23.332-23.332 23.332s-23.332-10.5-23.332-23.332v-280c0-12.832 10.5-23.332 23.332-23.332s23.332 10.5 23.332 23.332zm105 0v280c0 12.832-10.5 23.332-23.332 23.332s-23.332-10.5-23.332-23.332v-280c0-12.832 10.5-23.332 23.332-23.332s23.332 10.5 23.332 23.332zm105 0v280c0 12.832-10.5 23.332-23.332 23.332s-23.332-10.5-23.332-23.332v-280c0-12.832 10.5-23.332 23.332-23.332s23.332 10.5 23.332 23.332z"></path><use x="70" y="735" ></use><use x="220.503906" y="735" ></use><use x="287.953125" y="735" ></use><use x="350.015625" y="735"></use><use x="450.105469" y="735"></use><use x="546.464844" y="735"></use></g></svg>
                    </button>
                    <button className="hidden group-hover:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 10" width="14.399999999999999" height="12" fill="#333"><path d="M0 4.99122C0.521305 2.15177 3.00971 0 6 0C8.9903 0 11.4781 2.15177 12 4.99122C11.4787 7.83067 8.9903 9.98244 6 9.98244C3.00971 9.98244 0.52186 7.83067 0 4.99122ZM6 7.76412C6.73542 7.76412 7.44072 7.47197 7.96074 6.95196C8.48076 6.43194 8.7729 5.72664 8.7729 4.99122C8.7729 4.2558 8.48076 3.5505 7.96074 3.03048C7.44072 2.51046 6.73542 2.21832 6 2.21832C5.26458 2.21832 4.55928 2.51046 4.03926 3.03048C3.51924 3.5505 3.2271 4.2558 3.2271 4.99122C3.2271 5.72664 3.51924 6.43194 4.03926 6.95196C4.55928 7.47197 5.26458 7.76412 6 7.76412ZM6 6.65496C5.55875 6.65496 5.13557 6.47967 4.82356 6.16766C4.51155 5.85565 4.33626 5.43247 4.33626 4.99122C4.33626 4.54997 4.51155 4.12679 4.82356 3.81478C5.13557 3.50277 5.55875 3.32748 6 3.32748C6.44125 3.32748 6.86443 3.50277 7.17644 3.81478C7.48845 4.12679 7.66374 4.54997 7.66374 4.99122C7.66374 5.43247 7.48845 5.85565 7.17644 6.16766C6.86443 6.47967 6.44125 6.65496 6 6.65496Z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

const LayerItem = memo(LayerItemMome);

export {
    LayerItem
}