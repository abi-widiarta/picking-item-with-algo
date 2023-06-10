package main

import "fmt"

type Coin struct {
	Weight int
	Value  int
	Tier   string
}

func searchMax(coinz []Coin) int {
	var tempv int = 0
	var temp int = 0
	for i := 0; i < 8; i++ {
		if coinz[i].Value > tempv {
			temp = i
			tempv = coinz[i].Value
		}
	}
	return temp
}

func greedy(coinz []Coin, maxWeight int) [8]Coin {
	var selec [8]Coin
	var Value int
	var max int
	for i := 0; i < 8; i++ {
		max = searchMax(coinz)
		if max == 7 {
			if (selec[max-1].Value == 0) && maxWeight >= coinz[max].Weight {
				selec[max].Value = coinz[max].Value
				selec[max].Weight = coinz[max].Weight
				Value += coinz[max].Value
				maxWeight -= selec[max].Weight
			}
		} else if max == 0 {
			if (selec[max+1].Value == 0) && maxWeight >= coinz[max].Weight {
				selec[max].Value = coinz[max].Value
				selec[max].Weight = coinz[max].Weight
				Value += coinz[max].Value
				maxWeight -= selec[max].Weight
			}
		} else {
			if (selec[max+1].Value == 0 && selec[max-1].Value == 0) && maxWeight >= coinz[max].Weight {
				selec[max].Value = coinz[max].Value
				selec[max].Weight = coinz[max].Weight
				Value += coinz[max].Value
				maxWeight -= selec[max].Weight
			}
		}
		coinz[max].Value = 0
	}
	return selec
}

func returnIndex(selec [8]Coin) []int {
	var index []int
	for i := 0; i < 8; i++ {
		if selec[i].Value != 0 {
			index = append(index, i)
		}
	}
	return index
}

func main() {
	coins := []Coin{
		{Value: 5, Weight: 10, Tier: "common"},
		{Value: 10, Weight: 20, Tier: "common"},
		{Value: 40, Weight: 30, Tier: "rare"},
		{Value: 100, Weight: 100, Tier: "rare"},
		{Value: 60, Weight: 35, Tier: "epic"},
		{Value: 170, Weight: 100, Tier: "epic"},
		{Value: 80, Weight: 30, Tier: "legendary"},
		{Value: 100, Weight: 40, Tier: "legendary"},
	}

	maxWeight := 200

	selec := greedy(coins, maxWeight)
	fmt.Println(returnIndex(selec))
}

// itemx: {mana,stat,tier}
// item1: {10,5,normal}
// item2: {20,10,normal}
// item3: {50,50,normal}
// item4: {5,5,normal}
// item5: {30,40,rare}
// item6: {10,20,rare}
// item7: {20,30,rare}
// item8: {100,100,rare}
// item9: {20,40,epic}
// item10: {100,170,epic}
// item11: {70,120,epic}
// item12: {35,60,epic}
// item13: {10,30,legendary}
// item14: {40,100,legendary}
// item15: {150,300,legendary}
// item16: {30,80,legendary}
