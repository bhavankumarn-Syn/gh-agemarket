import { useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import step1 from '../../assets/how_img1.png'
import step2 from '../../assets/how_img2.png'
import step3 from '../../assets/how_img3.png'


const items: CollapseProps["items"] = [
  {
    key: "1",
    label: <span className="acc_title" dangerouslySetInnerHTML={{ __html: "<b>Step 1:</b> Subscribe to an AI Agent" }} />,
    children: <ul>
        <li>Browse & select from <b>Chat, Voice, Avatar, or IoT AI agents</b>.</li>
        <li><b>One-click subscription</b>—no complex setup required.</li>
    </ul>,
  },
  {
    key: "2",
    label: <span className="acc_title" dangerouslySetInnerHTML={{ __html: "<b>Step 2:</b> Upload Your Data" }} />,
    children: <ul>
        
        <li>Fine-tune AI performance by <b>uploading business data</b>.</li>
        <li>AI learns & adapts for <b>customized, industry-specific responses</b>.</li>
    </ul>,
  },
  {
    key: "3",
    label: <span className="acc_title" dangerouslySetInnerHTML={{ __html: "<b>Step 3:</b> Connect & Start Using AI" }} />,
    children: <ul>
        <li><b>Integrate with tools</b> like CRM, ERP, support platforms & IoT .</li>
        <li>Manage AI agents <b>directly in the Synergetics portal</b>.</li>
    </ul>,
  },
];

function Accordion() {
  const [activeKey, setActiveKey] = useState<string>("1"); // Default to first panel
  const [prevKey, setPrevKey] = useState<string>('')

  const onChange = (key: string | string[]) => {
    
    console.log(key);
    // if (!key) return; // Prevent closing all panels
    const newKey = typeof key === "string" ? key : key[0];
    console.log("newKey: ", newKey);

    if (newKey !== activeKey) {
      setActiveKey(newKey); // Only update if a different panel is clicked
    }
    if (newKey === undefined){
        setActiveKey(prevKey)
    }
    if(newKey !== undefined){
        setPrevKey(newKey) 
    }


    
  };

  return (
    <>
    <div className="accordionContainer">

        <div className="acc_Images">
            <img src={activeKey === '1' ? step1 : activeKey === '2' ? step2 : step3 } alt="acc_Images" />
        </div>
        <div className="acc_Steps">
            <h4>Get Started in 3 Simple Steps</h4>
            <Collapse
            accordion
            items={items}
            activeKey={activeKey}
            onChange={onChange}
            expandIcon={({ isActive }) =>
                isActive ? <MinusCircleOutlined /> : <PlusCircleOutlined />
            }
            />
        </div>
        

    </div>
    
    </>
    
  );
}

export default Accordion;
