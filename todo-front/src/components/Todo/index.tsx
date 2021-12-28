type Props = {
    task: string;
    done: boolean;
};

export const Todo = ({task, done}: Props) => {
    return (
    <div className="w-80 rounded-lg p-5 shadow-lg text-center">
        <h1 className="text-3xl font-bold">
          {task}
        </h1>
      </div>
    );
} 