import { Component, inject } from '@angular/core';
import { Invoice } from '../invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-show',
  templateUrl: './invoice-show.component.html',
  styleUrls: ['./invoice-show.component.css']
})
export class InvoiceShowComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  invoiceId = -1;
  invoice: Invoice | undefined;
  invoiceService: InvoiceService = inject(InvoiceService);

  constructor() {
    this.invoiceId = Number(this.route.snapshot.params['id']);
    this.invoiceService.getInvoice(this.invoiceId).then(
      (invoice) => {
        this.invoice = invoice;
      }
    );
  }

  printInvoice() {
    window.print();
  }

}
