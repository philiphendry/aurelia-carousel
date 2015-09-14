import {inject, bindable} from "aurelia-framework";
import {EventAggregator} from "aurelia-event-aggregator";
import "font-awesome";
import "bootstrap/css/bootstrap.css!";
import "./carousel.css!";

@inject(EventAggregator)
export class CarouselCustomElement {
	@bindable template;
	@bindable items;

	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;		
	}

	activate() {
		this.itemsChanged(this.items);
	}

	itemsChanged(items) {
		// this.items = items;
		this.currentIndex = 0;		
		this.navigate(0);
	}

	previous() {
		this.navigate(-1);
	}

	next() {
		this.navigate(1);
	}	

	navigate(direction) {
		if (!this.items[this.currentIndex])
			return;

		this.items[this.currentIndex].carouselCurrent = false;
		this.currentIndex += direction;
		if (direction === -1 && this.currentIndex < 0) {
			this.currentIndex = this.items.length - 1;
		}
		if (direction === 1 && !this.items[this.currentIndex]) {
			this.currentIndex = 0;
		}
		this.items[this.currentIndex].carouselCurrent = true;

		this.eventAggregator.publish(
			'carousel-navigate', 
			this.items[this.currentIndex]);
	}
}