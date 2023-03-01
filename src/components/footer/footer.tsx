import { FunctionComponent } from "react";
 
const Footer: FunctionComponent= () => {
    return ( 
        <footer className="bg-darker-blue h-40 p-4 to-transparent text-blue text-center flex flex-col justify-between">
            <p>footer content & links</p>
            <p className="text-sm">Luis Simosa, 2023</p>
        </footer>
     );
}
 
export default Footer;