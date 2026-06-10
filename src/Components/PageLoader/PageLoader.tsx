import { LoadingOutlined } from "@ant-design/icons"
import styles from "./pageLoader.module.scss"
import React from "react";

interface props{
    className?:string;
}

const PageLoader:React.FC<props>=({className})=>{
    return(
        <div className={`${styles.pageLoader} ${className}`}>
            <LoadingOutlined />
        </div>
    )
}
export default PageLoader