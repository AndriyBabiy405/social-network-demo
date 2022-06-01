import React, {useState} from "react";
import styles from "./Paginator.module.css";

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    partionSize?: number
}

let Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, partionSize = 10}) => {

    let pagesCount = Math.ceil (totalItemsCount / pageSize);

    let pages= [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionsCount = Math.ceil(pagesCount / partionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * partionSize + 1;
    let rightPortionPageNumber = portionNumber * partionSize;

    return <div>
        { portionNumber > 1 && 
        <button onClick={() => { setPortionNumber(portionNumber - 1)}}>Prev</button>
        }
        {pages.filter(p => (p: any) => leftPortionPageNumber && p <= rightPortionPageNumber) 
            .map( p => {
                return <span className={currentPage === p && styles.selectedPage }
                key={p}
                onClick={(e) => {onPageChanged(p)}}>{p}</span>
            })}
    {portionsCount > portionNumber && 
        <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
    }
    
</div>   
}

export default Paginator;