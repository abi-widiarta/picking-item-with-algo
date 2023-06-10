package main

import "fmt"

type Coin struct {
	Weight int
	Value  int
	Tier   string
}

func dynamicP(coins []Coin, maxWeight int) (int, []Coin) {
	n := len(coins)
	if n == 0 {
		return 0, []Coin{}
	} else if n == 1 {
		if coins[0].Weight <= maxWeight {
			return coins[0].Value, []Coin{coins[0]}
		} else {
			return 0, []Coin{}
		}
	} else {
		if coins[0].Weight <= maxWeight {
			value1, coins1 := dynamicP(coins[2:], maxWeight-coins[0].Weight)
			value1 += coins[0].Value

			value2, coins2 := dynamicP(coins[1:], maxWeight)

			if value1 > value2 {
				coins1 = append([]Coin{coins[0]}, coins1...)
				return value1, coins1
			} else {
				return value2, coins2
			}
		} else {
			return dynamicP(coins[1:], maxWeight)
		}
	}
}

func search(coins []Coin, cari Coin) int {
	var temp int = 0
	for i := 0; i < len(coins); i++ {
		if coins[i] == cari {
			temp = i
			break
		}
	}
	return temp
}

func returnIndex(coins, selec []Coin) []int {
	var index []int
	for i := 0; i < len(selec); i++ {
		index = append(index, search(coins, selec[i]))
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
	maxValue, set := dynamicP(coins, maxWeight)
	fmt.Println(returnIndex(coins, set))
	fmt.Println("Value =", maxValue)
}

// itemx: {mana,stat}
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
