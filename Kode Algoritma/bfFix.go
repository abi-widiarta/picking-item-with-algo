package main

import (
	"fmt"
)

type Coin struct {
	Value  int
	Weight int
	Tier   string
}

func bruteForce(coins []Coin, index int, currentWeight int, currentSum int, currentSet []Coin, sets *[][]Coin) {
	if index >= len(coins) {
		*sets = append(*sets, currentSet)
		return
	}

	// Tidak memilih koin saat ini
	bruteForce(coins, index+1, currentWeight, currentSum, currentSet, sets)

	// Memilih koin saat ini jika bobotnya tidak melebihi batas berat
	if currentWeight+coins[index].Weight <= 500 {
		newSet := make([]Coin, len(currentSet))
		copy(newSet, currentSet)
		newSet = append(newSet, coins[index])
		bruteForce(coins, index+1, currentWeight+coins[index].Weight, currentSum+coins[index].Value, newSet, sets)
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

func validasi(sets [][]Coin, coins []Coin, weight int) []Coin {
	var temp int = 0
	var index int
	var setTemp []Coin
	for _, set := range sets {
		if len(set) == 1 {
			if set[0].Weight <= weight {
				if set[0].Value > temp {
					temp = set[0].Value
					setTemp = set
				}
			}
		} else if len(set) == 2 {
			if coins[0] == set[0] {
				if set[1] != coins[1] {
					if set[0].Weight+set[1].Weight <= weight {
						if set[0].Value+set[1].Value > temp {
							temp = set[0].Value + set[1].Value
							setTemp = set
						}
					}
				}
			} else if coins[7] == set[1] {
				if set[0] != coins[6] {
					if set[0].Weight+set[1].Weight <= weight {
						if set[0].Value+set[1].Value > temp {
							temp = set[0].Value + set[1].Value
							setTemp = set
						}
					}
				}
			} else {
				index = search(coins, set[0])
				if set[1] != coins[index+1] && set[1] != coins[index-1] {
					if set[0].Weight+set[1].Weight <= weight {
						if set[0].Value+set[1].Value > temp {
							temp = set[0].Value + set[1].Value
							setTemp = set
						}
					}
				}
			}
		} else if len(set) == 3 {
			if coins[0] == set[0] {
				if set[1] != coins[1] {
					index = search(coins, set[1])
					if set[2] != coins[index+1] {
						if set[0].Weight+set[1].Weight+set[2].Weight <= weight {
							if set[0].Value+set[1].Value+set[2].Value > temp {
								temp = set[0].Value + set[1].Value + set[2].Value
								setTemp = set
							}
						}
					}
				}
			} else if coins[7] == set[2] {
				if set[1] != coins[6] {
					index = search(coins, set[1])
					if set[0] != coins[index-1] {
						if set[0].Weight+set[1].Weight+set[2].Weight <= weight {
							if set[0].Value+set[1].Value+set[2].Value > temp {
								temp = set[0].Value + set[1].Value + set[2].Value
								setTemp = set
							}
						}
					}
				}
			} else {
				index = search(coins, set[0])
				if set[1] != coins[index+1] && set[1] != coins[index-1] {
					index = search(coins, set[1])
					if set[2] != coins[index+1] && set[2] != coins[index-1] {
						if set[0].Weight+set[1].Weight+set[2].Weight <= weight {
							if set[0].Value+set[1].Value+set[2].Value > temp {
								temp = set[0].Value + set[1].Value + set[2].Value
								setTemp = set
							}
						}
					}
				}
			}
		} else if len(set) == 4 {
			if coins[0] == set[0] {
				if set[1] != coins[1] {
					index = search(coins, set[1])
					if set[2] != coins[index+1] {
						index = search(coins, set[2])
						if set[3] != coins[index+1] {
							if set[0].Weight+set[1].Weight+set[2].Weight+set[3].Weight <= weight {
								if set[0].Value+set[1].Value+set[2].Value+set[3].Value > temp {
									temp = set[0].Value + set[1].Value + set[2].Value + set[3].Value
									setTemp = set
								}
							}
						}
					}
				}
			} else if coins[7] == set[2] {
				if set[1] != coins[6] {
					index = search(coins, set[1])
					if set[0] != coins[index-1] {
						index = search(coins, set[1])
						if set[1] != coins[index-1] {
							if set[0].Weight+set[1].Weight+set[2].Weight+set[3].Weight <= weight {
								if set[0].Value+set[1].Value+set[2].Value+set[3].Value > temp {
									temp = set[0].Value + set[1].Value + set[2].Value + set[3].Value
									setTemp = set
								}
							}
						}
					}
				}
			} else {
				index = search(coins, set[0])
				if set[1] != coins[index+1] && set[1] != coins[index-1] {
					index = search(coins, set[1])
					if set[2] != coins[index+1] && set[2] != coins[index-1] {
						index = search(coins, set[2])
						if set[3] != coins[index+1] && set[3] != coins[index-1] {
							if set[0].Weight+set[1].Weight+set[2].Weight+set[3].Weight <= weight {
								if set[0].Value+set[1].Value+set[2].Value+set[3].Value > temp {
									temp = set[0].Value + set[1].Value + set[2].Value + set[3].Value
									setTemp = set
								}
							}
						}
					}
				}
			}
		}
	}
	return setTemp
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
	sets := [][]Coin{}
	bruteForce(coins, 0, 0, 0, []Coin{}, &sets)

	maxWeight := 200

	set := validasi(sets, coins, maxWeight)
	fmt.Println(returnIndex(coins, set))
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
