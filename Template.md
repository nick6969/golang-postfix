# This is All Template Document

if no see the `InCome` case, all using `abcd` to demo OutCome

### Test Function

Template: `.testFunc`

OutCome:

    func TestAbcd(t *testing.T) {

    }

### Benchmark Function

Template: `.benchmarkFunc`

OutCome:

    func BenchmarkAbcd(b *testing.B) {

    }

### IF Condition

Template: `.if`

OutCome:

    if abcd {

    }

### IF Not Condition

Template: `.else`

OutCome:

    if !abcd {

    }

### IF Equal Nil

Template: `.nil`

OutCome:

    if abcd == nil {

    }

### IF Not Nil

Template: `.not nil`

InCome: `abcd.not nil`

OutCome:

    if abcd != nil {

    }

### For

Template: `.for`

OutCome:

    for index, element := range abcd {

    }


### For Range

Template: `.for range`

OutCome:

	for index := range abcd {

    }


### Append

Template: `.append`

OutCome:

	abcd = append(abcd, element)


### Len

Template: `.len`

OutCome:

    len(abcd)


### Print

Template: `.print`

OutCome:

    fmt.Println(abcd)

### Print Format

Template: `.print format`

OutCome:

    fmt.Printf("%+v\n", abcd)

### Log

Template: `.log`

OutCome:

    log.Println(abcd)

### Log Format

Template: `.log format`

OutCome:

    log.Printf("%+v\n", abcd)


### Error

Template: `.error`

InCome: `"abcd".error`

OutCome:

    errors.New("abce")


### Struct

Template: `.struct`

OutCome:

    type abcd struct {
		
	}

### Interface

Template: `.interface`

OutCome:

	type abcd interface {
		
	}


### IsEmpty

Template: `.isEmpty`

OutCome:

    len(abcd) == 0


### IsNotEmpty

Template: `.isNotEmpty`

OutCome:

    len(abcd) != 0

### JSON

Template: `.(type)JSON`

    type have string / int / int64 / float32 / float64 / bool

    will capitalization


OutCome:

    Abcd (type) `json:"abcd"`


## Other Third Party Framework

### Gin