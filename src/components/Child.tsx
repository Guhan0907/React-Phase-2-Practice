import React from "react";

 const Child = (props: any) => {
    const {handleFunction} = props;
    console.log("Child component rendered 🧒");
    return (
        <div>
        
            <h4> Hello this is Gojo </h4>
            <button onClick={handleFunction}> Click Me</button>
        
        </div>
    )
}

export default React.memo (Child);
// export default Child