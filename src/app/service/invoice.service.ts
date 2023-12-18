import { Invoice } from './../invoice/invoice';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  token = sessionStorage.getItem("token");
  config = {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${this.token}`
  }};
  apiUrl = "http://localhost:8000/api/invoices";
  index: number = 0;

  constructor(private http: HttpClient) {}

  async getAllInvoices(): Promise<Invoice[]> {
    //const data = await fetch(this.apiUrl);
    const res = await axios.get(this.apiUrl, this.config);
    return res.data ?? [];
  }

  async getInvoice(id: number): Promise<Invoice | undefined> {
    const res = await axios.get(`${this.apiUrl}/${id}`, this.config);
    return res.data ?? [];
  }

  async removeInvoice(id: number): Promise<Invoice | undefined> {
    const res = await axios.delete(`${this.apiUrl}/${id}`, this.config);
    return res.data ?? [];
  }

  async addInvoice(invoice: Invoice): Promise<Invoice | undefined> {
    const res = await axios.post(this.apiUrl, invoice, this.config);
    return res.data ?? [];
  }

}
