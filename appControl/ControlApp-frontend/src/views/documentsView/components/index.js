import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 75vw;
  border: 2px dashed royalblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  text {
    font-size: 40px;
  }

  .icon {
    display: flex;
    justify-content: center;
    font-size: 70px;
  }

  .upload {
    background-color: transparent;
    border: none;
    color: royalblue;

    :hover {
      cursor: pointer;
    }
  }

  #selected {
    text-transform: uppercase;
    color: #000;
    padding: 0 5px;
    border: 0px;
    background-color: transparent;
  }

  .wrapperp {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .file-upload {
      height: 200px;
      width: 200px;
      border-radius: 100px;
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      border: 4px solid #ffffff;
      overflow: hidden;
      background-image: linear-gradient(to bottom, #2590eb 50%, #ffffff 50%);
      background-size: 100% 200%;
      transition: all 1s;
      color: #ffffff;
      font-size: 100px;

      input[type='file'] {
        height: 200px;
        width: 200px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }

      &:hover {
        background-position: 0 -100%;
        color: #2590eb;
      }
    }
  }

  .div-up {
    position: absolute;
    bottom: 8px;
    right: 16px;
  }

  .btn-up {
    width: 200px;
    background-color: royalblue;
    color: white;
    border: none;
    border-radius: 10px;
    height: 40px;
    font-family: serif;
    font-weight: bold;
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    margin-top: 2rem;

    input {
      background-color: #f1f6fe;
      border-radius: 1rem;
      border: none;
      padding-left: 1rem;
      color: #95bdfd;
    }
    textarea {
      background-color: #f1f6fe;
      border-radius: 1rem;
      border: none;
      padding-left: 1rem;
      color: #95bdfd;
    }
    h2 {
      color: royalblue;
    }
    p {
      color: royalblue;
    }
    button {
      border-radius: 15px;
      color: white;
      border: none;
      background-color: royalblue;
      margin: 10px 10px;
      padding: 2px 15px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;

    .wrapperp {
      .file-upload {
        height: 100px;
        width: 100px;
        font-size: 50px;

        input[type='file'] {
          height: 100px;
          width: 100px;
        }
      }
    }
  }

  @media (max-width: 600px) {
    text {
      font-size: 15px;
    }
  }
`;

export const BtnDocuments = styled.button`
  border-radius: 15px;
  color: white;
  border: none;
  background-color: royalblue;
  margin: 10px 60px;
  padding: 2px 15px;

  @media (max-width: 600px) {
    margin: 10px 40px;
  }
`;
