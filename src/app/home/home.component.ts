import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';
import { Symbol } from './symbol';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currencyList: Symbol[] = [];

  amount: number = 1.00;
  currency1: String = "BRL";
  currency2: String = "USD";
  result?: number;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.getExchange();
  }

  getExchange() {
    this.exchangeService.getSymbols().subscribe({
      next: (res) =>  {
        Object.values(res.symbols).map((s: any) => {
          this.currencyList.push(new Symbol(s.description, s.code));
        })
      },
      error: (err) =>  console.log(err)
    })
  }

  changeCurrency() {
    const temp = this.currency1;
    this.currency1 = this.currency2;
    this.currency2 = temp;
    this.result = undefined;
  }

  convert() {
    this.exchangeService.convert(this.currency1, this.currency2, this.amount).subscribe({
      next: (res) =>  {
        this.result = res.result;
      },
      error: (err) =>  console.log(err)
    })
  }

}
