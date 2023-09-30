import React, {useState, useEffect} from "react";

function TodoGroup({todoGroup}) {

    return (
    <label className={'TodoGroup'}>
        {todoGroup.name}
    </label>
    )

}

export default TodoGroup;