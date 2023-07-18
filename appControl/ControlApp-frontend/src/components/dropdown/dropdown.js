import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const SelectBox = styled.div`
    position: relative;
    width: 28%;
`;
const DropdownBtn = styled.div`
    position: relative;
    height: 45px;
    width: 100%;
    padding: 0 25px;

    border: none;
    border-radius: 10px;

    color: #2b7bfc;
    background-color: #e5ecf8;

    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        margin: auto 0;
        font-weight: 600;
    }
    svg {
        font-size: small;
    }

    .hiddenBtn {
        position: absolute;
        border: none;
        background: none;
        color: transparent;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const DropdownInf = styled.div`
    position: absolute;
    overflow: hidden;
    width: 100%;
    padding: 2vh 0;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 3px 12px 0 #00000020;

    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    gap: 8px;
    &.active {
        display: flex;
    }
    z-index: 1;
`;
const AllOption = styled.div`
    width: 80%;
    padding: 0 1vw;
    height: 50px;
    border-radius: 5px;
    background-color: #ecf3ff;
    color: #2b7bfc;

    display: flex;
    align-items: center;
    justify-content: center;
`;
const Treballador = styled.div`
    width: 80%;
    padding: 0 1vw;
    height: 50px;
    border-radius: 5px;
    background-color: #ecf3ff;

    display: grid;
    grid-template-columns: 30% 70%;

    p {
        text-overflow: ellipsis;
        align-self: end;
        white-space: nowrap;
        overflow: hidden;
        margin: auto 0;
        color: #2b7bfc;
        font-weight: 600;
    }
    img {
        margin: auto 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: white;
        margin-left: 10px;
    }

    &.pink {
        background: #ffecff;
    }
    &.pink > p {
        color: #ff8de5;
    }
`;

/* adds or removes active class to dropdown options */
const showDropdown = () => {
    const dropdown = document.querySelector('.dropdownInfo');
    if (dropdown.classList.contains('active'))
        dropdown.classList.remove('active');
    else dropdown.classList.add('active');
};

function element(content) {
    return content.gender === 'm' ? (
        <Treballador>
            <img alt="a"></img>
            <p>{content.name}</p>
        </Treballador>
    ) : (
        <Treballador className="pink">
            <img alt="a"></img>
            <p>{content.name}</p>
        </Treballador>
    );
}

export function Dropdown({ type }) {
    const elements = [
        { img: '', name: 'Pere Brossa', gender: 'm' },
        { img: '', name: 'Pere Brossaaaaaaaaa', gender: 'm' },
        { img: '', name: 'Andrea Martí', gender: 'f' },
    ];
    return (
        <SelectBox>
            <DropdownBtn>
                <button
                    className="hiddenBtn"
                    type="button"
                    onClick={() => showDropdown()}
                >
                    .
                </button>
                <p>Tots</p>
                <FaChevronDown />
            </DropdownBtn>
            <DropdownInf className="dropdownInfo">
                <AllOption>Tots</AllOption>
                {elements.map((t) => element(t))}
            </DropdownInf>
        </SelectBox>
    );
}
