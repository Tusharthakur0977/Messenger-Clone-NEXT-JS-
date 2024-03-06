'use client';

import React from 'react';

interface IModal {
  isOpen: boolean;
  onCLose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModal> = ({ isOpen, onCLose, children }) => {
  return <div>{children}</div>;
};

export default Modal;
