import React, { useState, useEffect} from 'react';

type Props = {
    task: string,
    done: boolean,
};

export const Todo = ({task, done}: Props) => {
    const [checked, setChecked] = useState(done);

    useEffect(() => {
        setChecked(done)
    }, [done]);

    return (
    <div className="w-80 rounded-lg p-5 shadow-lg text-center">
        <input 
            className="w-5 h-5 checked:bg-blue-500"         
            type="checkbox" 
            checked={checked}
            onClick={() => setChecked(!checked)}
        />
        <span className={`ml-5 text-3xl font-bold ${checked ? "line-through" : ""}`}>
          {task}
        </span>
      </div>
    );
}; 
