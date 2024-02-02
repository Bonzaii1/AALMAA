export const EditIcon = ({ h, ...props }) => {
    return (
        <div className="edit-container">
            <svg
                height={h}
                fill="transparent"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                className="edit-icon"
                {...props}
            >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
        </div>

    );
};


export const TrashIcon = ({ ...props }) => {
    return (
        <div className="trash-container">
            <svg
                fill="transparent"
                stroke="red"
                strokeWidth="6"
                height="18"
                viewBox="0 0 490.646 490.646"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="trash-icon"
                {...props}
            >
                <g>
                    <g>
                        <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z" />
                        <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z" />
                    </g>
                </g>
            </svg>
        </div>

    );
};