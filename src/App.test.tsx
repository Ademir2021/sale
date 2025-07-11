import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

const sum = (x:number, y:number)=>{
    return x + y
}

describe("App Components", ()=>{
    it("should sum correctly", ()=>{
        expect(sum(7,7)).toBe(14)
    })

    it("should render with hello message", ()=>{
        render(<App />)
        screen.getByText("Hello World !!")
    })
})