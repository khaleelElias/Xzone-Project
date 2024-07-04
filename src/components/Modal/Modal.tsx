import React, { ReactNode } from "react";
import './Modal.css';

export interface IModalProps {
    open: boolean;
    title: string;
    children?: ReactNode;
}

const Modal = (props: IModalProps) => {
    if (props.open !== true)
        return null;

    return (
        <section className="modal">
            <article className="modal-content">
                <main className="modal-mainContents">
                    <h5 className="modal-title">{props.title}</h5>
                    <hr />
                    {props.children}
                </main>
            </article>
        </section>
    );
};

export default Modal;