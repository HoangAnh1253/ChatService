import React, { useContext } from 'react';
import MainAppBar from '~/components/assets/AppBar';
import PageIndexContext from '~/Context/PageIndexContext';

function DefaultLayout({ children }) {
    const pageIndex = useContext(PageIndexContext);
    return (
        <React.Fragment>
            <MainAppBar
                activePageIndex={pageIndex.activePageIndex}
                onChangeTabbarIndex={pageIndex.onChangeTabbarIndex}
            />  
            {children}
        </React.Fragment>
    );
}

export default DefaultLayout;
