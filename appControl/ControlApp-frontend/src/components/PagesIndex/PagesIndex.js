import React from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';

const NumberBox = styled.div`
    position: absolute;
    bottom: 10vh;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 0 auto;

    svg {
        font-size: x-small;
        margin: auto 0;
        color: #2b7bfc;
    }
`;
const PageBtn = styled.button`
    border: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: none;
    text-align: center;
    font-size: small;
    color: #2b7bfc;
    &.active {
        background: #2b7bfc;
        color: #f9f9f9;
    }
`;
/* Bnt onClick
 * change active page
 */
const setActive = (event) => {
    document
        .querySelectorAll('.pageBtn')
        .forEach((b) => b.classList.remove('active'));
    event.target.classList.add('active');
};

export function PagesIndex({ num }) {
    const elements = Array.from({ length: num }, (_, index) => index + 1);
    return (
        <NumberBox>
            {elements.map((n) => (
                <PageBtn
                    className={n === 1 ? 'pageBtn active' : 'pageBtn'}
                    key={n} 
                    onClick={(event) => setActive(event)}
                >
                    {n}
                </PageBtn>
            ))}
            <FaChevronRight />
        </NumberBox>
    );
}
