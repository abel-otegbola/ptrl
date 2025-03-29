export default function Slider() {
    return (
        <div
            x-data="{}"
            x-init="$nextTick(() => {
                let ul = $refs.logos;
                ul.insertAdjacentHTML('afterend', ul.outerHTML);
                ul.nextSibling.setAttribute('aria-hidden', 'true');
            })"
            className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_40px,_black_calc(100%-40px),transparent_100%)]"
        >
            <ul x-ref="logos" className="flex items-center sm:text-[16px] text-[14px] justify-center gap-12 md:justify-start sm:[&_li]:w-[250px] [&_li]:w-[200px] [&_img]:max-w-none animate-infinite-scroll">
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
                <li>
                    <p>Performance MEETS style</p>
                </li>
            </ul>                
        </div>
    )
}