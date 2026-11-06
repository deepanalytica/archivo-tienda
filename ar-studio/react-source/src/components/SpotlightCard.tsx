import {type MouseEvent,type PropsWithChildren,useRef} from 'react';
// Implementación original de spotlight, inspirada en la categoría de microinteracciones de React Bits.
// No es código copiado del repositorio ni afirma ser un componente oficial.
export function SpotlightCard({children,className=''}:PropsWithChildren<{className?:string}>){
 const ref=useRef<HTMLElement|null>(null);
 const move=(e:MouseEvent<HTMLElement>)=>{
  const bounds=e.currentTarget.getBoundingClientRect();
  ref.current?.style.setProperty('--pointer-x',`${e.clientX-bounds.left}px`);
  ref.current?.style.setProperty('--pointer-y',`${e.clientY-bounds.top}px`);
 };
 return <article ref={ref} className={`spotlight ${className}`} onMouseMove={move}>{children}</article>;
}