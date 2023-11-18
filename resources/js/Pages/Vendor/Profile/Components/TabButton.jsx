export default function TabButton(props) {
    return (
        <div>
            <button type="button" class={`-mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-blue-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 ${props.class}`}>
                {props.title}
            </button>
        </div>
    );
}

